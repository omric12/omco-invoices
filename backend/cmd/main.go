package main

import (
	"log"
	"omco-invoices/internal/config"
	"omco-invoices/internal/handlers"
	"omco-invoices/internal/middleware"
	"omco-invoices/internal/models"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatal("Failed to load config:", err)
	}

	// Models Migration
	if err := cfg.DB.AutoMigrate(&models.User{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}
	if err := cfg.DB.AutoMigrate(&models.Company{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}
	if err := cfg.DB.AutoMigrate(&models.Invoice{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}
	if err := cfg.DB.AutoMigrate(&models.UserInvoiceCounter{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	r := gin.Default()

	// Initialize handlers
	authHandler := handlers.NewAuthHandler(cfg.DB, cfg.JWTSecret)
	invoiceHandler := handlers.NewInvoiceHandler(cfg.DB)
	companyHandler := handlers.NewCompanyHandler(cfg.DB)
	summaryHandler := handlers.NewSummaryHandler(cfg.DB)
	pdfHandler := handlers.NewPDFHandler(cfg.DB)

	// Public routes
	auth := r.Group("/auth")
	{
		auth.POST("/login", authHandler.Login)
		auth.POST("/register", authHandler.Register)
	}

	// Protected routes
	api := r.Group("/api")
	api.Use(middleware.AuthMiddleware(cfg.JWTSecret))
	{
		invoices := api.Group("/invoices")
		{
			invoices.GET("/", invoiceHandler.GetInvoices)
			invoices.POST("/", invoiceHandler.CreateInvoice)
			invoices.GET("/:id", invoiceHandler.GetInvoice)
			invoices.PUT("/:id", invoiceHandler.UpdateInvoice)
			invoices.DELETE("/:id", invoiceHandler.DeleteInvoice)
			invoices.GET("/:id/pdf", pdfHandler.GenerateInvoicePDF)
		}
		company := api.Group("/company")
		{
			company.GET("/", companyHandler.GetCompanies)
			company.POST("/", companyHandler.CreateCompany)
			company.PUT("/:id", companyHandler.UpdateCompany)
		}
		summary := api.Group("/summary")
		{
			summary.GET("/", summaryHandler.GetSummary)
		}
	}

	log.Fatal(r.Run(":" + cfg.Port))
}
