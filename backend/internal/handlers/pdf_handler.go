package handlers

import (
	"net/http"
	"omco-invoices/internal/models"
	"omco-invoices/internal/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type PDFHandler struct {
	db         *gorm.DB
	pdfService *services.PDFService
}

func NewPDFHandler(db *gorm.DB) *PDFHandler {
	return &PDFHandler{
		db:         db,
		pdfService: services.NewPDFService(),
	}
}

func (h *PDFHandler) GenerateInvoicePDF(c *gin.Context) {
	// Get invoice ID from URL
	invoiceID := c.Param("id")

	// Get invoice from database
	var invoice models.Invoice
	if err := h.db.First(&invoice, "id = ?", invoiceID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Invoice not found"})
		return
	}

	// Generate PDF
	pdfBuffer, err := h.pdfService.GenerateInvoicePDF(&invoice)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate PDF"})
		return
	}

	// Set response headers
	c.Header("Content-Type", "application/pdf")
	c.Header("Content-Disposition", "attachment; filename=invoice-"+invoice.ID+".pdf")

	// Write PDF to response
	if _, err := c.Writer.Write(pdfBuffer.Bytes()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send PDF"})
		return
	}
}
