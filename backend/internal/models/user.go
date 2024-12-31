package models

type User struct {
	Base
	FirstName string `gorm:"size:255;not null" json:"first_name"`
	LastName  string `gorm:"size:255" json:"last_name"`
	Email     string `gorm:"unique;not null"`
	Password  string `gorm:"not null"`
}
