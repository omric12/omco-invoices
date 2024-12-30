package shared

// Define common data structures and types used across the application

type User struct {
    ID    int
    Name  string
    Email string
}

type Config struct {
    Port int
    Env  string
}