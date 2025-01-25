package services

import (
	"bytes"
	"fmt"
	"omco-invoices/internal/models"
	"time"

	"github.com/jung-kurt/gofpdf"
)

type PDFService struct {}

func NewPDFService() *PDFService {
	return &PDFService{}
}

func (s *PDFService) GenerateInvoicePDF(invoice *models.Invoice) (*bytes.Buffer, error) {
	pdf := gofpdf.New("P", "mm", "A4", "")
	pdf.AddPage()

	// Set font
	pdf.SetFont("Arial", "B", 16)

	// Header
	pdf.Cell(190, 10, fmt.Sprintf("Invoice #%d", invoice.Number))
	pdf.Ln(10)

	// Date
	pdf.SetFont("Arial", "", 12)
	pdf.Cell(190, 10, fmt.Sprintf("Date: %s", invoice.Date.Format(time.RFC822)))
	pdf.Ln(10)

	// Customer Information
	pdf.SetFont("Arial", "B", 14)
	pdf.Cell(190, 10, "Customer Information")
	pdf.Ln(8)
	pdf.SetFont("Arial", "", 12)
	pdf.Cell(190, 10, fmt.Sprintf("Name: %s", invoice.CustomerName))
	pdf.Ln(6)
	if invoice.CustomerEmail != nil {
		pdf.Cell(190, 10, fmt.Sprintf("Email: %s", *invoice.CustomerEmail))
		pdf.Ln(6)
	}
	if invoice.CustomerPhone != nil {
		pdf.Cell(190, 10, fmt.Sprintf("Phone: %s", *invoice.CustomerPhone))
		pdf.Ln(6)
	}
	if invoice.CustomerAddr != nil {
		pdf.Cell(190, 10, fmt.Sprintf("Address: %s", *invoice.CustomerAddr))
		pdf.Ln(10)
	}

	// Invoice Details
	pdf.SetFont("Arial", "B", 14)
	pdf.Cell(190, 10, "Invoice Details")
	pdf.Ln(8)
	pdf.SetFont("Arial", "", 12)
	pdf.Cell(190, 10, fmt.Sprintf("Amount: $%.2f", invoice.Amount))
	pdf.Ln(6)
	pdf.Cell(190, 10, fmt.Sprintf("Payment Method: %s", invoice.PaymentMethod))
	pdf.Ln(6)
	if invoice.Description != nil {
		pdf.Cell(190, 10, fmt.Sprintf("Description: %s", *invoice.Description))
		pdf.Ln(6)
	}
	if invoice.ItemsQuantity != nil {
		pdf.Cell(190, 10, fmt.Sprintf("Items Quantity: %d", *invoice.ItemsQuantity))
		pdf.Ln(6)
	}

	// Create buffer
	var buf bytes.Buffer
	err := pdf.Output(&buf)
	if err != nil {
		return nil, fmt.Errorf("failed to generate PDF: %v", err)
	}

	return &buf, nil
}