package handlers

import (
	"fmt"
	"net/http"
	"omco-invoices/internal/models"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type SummaryHandler struct {
	db *gorm.DB
}
type Summary struct {
	TotalInvoices int
	TotalAmount   float64
	Duration      int
	FromDate      string
	ToDate        string
	Invoices      []models.Invoice
}

func NewSummaryHandler(db *gorm.DB) *SummaryHandler {
	return &SummaryHandler{db: db}
}

func (h *SummaryHandler) GetSummary(c *gin.Context) {
	//User authorization
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication failed"})
		return
	}
	fromDefault := time.Now().AddDate(0, 0, -30).Format("02/01/06")
	from := c.DefaultQuery("from", fromDefault)
	toDefault, _ := time.Parse("02/01/06", from)
	toDefault = toDefault.AddDate(0, 0, 30)
	to := c.DefaultQuery("to", toDefault.Format("02/01/06"))
	startDate, _ := time.Parse("02/01/06", from)
	endDate, _ := time.Parse("02/01/06", to)
	endDate = endDate.AddDate(0, 0, 1)

	// Calculate duration
	duration := int(endDate.Sub(startDate).Hours() / 24)

	//Format and String dates
	startDateStr := startDate.Format("02/01/06")
	endDateStr := endDate.Format("02/01/06")

	fmt.Printf("from: %s, to: %s\n", startDateStr, endDateStr)
	// Get all invoices for the user
	var invoices []models.Invoice
	if err := h.db.Where("user_id = ? AND created_at >= ? AND created_at <= ?", userID, startDateStr, endDateStr).Find(&invoices).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Invoices not found"})
		return
	}

	// Data aggregation
	var summary Summary
	for _, invoice := range invoices {
		summary.TotalInvoices++
		summary.TotalAmount += invoice.Amount
	}
	summary.Duration = duration
	summary.Invoices = invoices
	summary.FromDate = endDate.Format("02/01/06")
	summary.ToDate = startDate.Format("02/01/06")

	c.JSON(http.StatusOK, summary)
}
