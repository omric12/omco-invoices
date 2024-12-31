package models

type User struct {
	Base
	FirstName     string `gorm:"size:255;not null" json:"first_name"`
	LastName      string `gorm:"size:255" json:"last_name"`
	Email         string `gorm:"unique;not null"`
	Password      string `gorm:"not null"`
	Plan          string `gorm:"size:255;default:'free'" json:"plan"`
	Status        string `gorm:"size:255;default='registered'" json:"status"`
	EmailVerified bool   `gorm:"default:false" json:"email_verified"`
}
type Company struct {
	Base
	UserID      string `gorm:"not null" json:"user_id"`
	Name        string `gorm:"size:255;not null" json:"name"`
	Address     string `gorm:"size:255" json:"address"`
	PhoneNumber string `gorm:"size:255" json:"phone_number"`
}
