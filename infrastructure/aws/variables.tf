variable "aws_region" {
  default = "us-east-1"
}

variable "project_name" {
  default = "task-board"
}

variable "db_name" {
  default = "app"
}

variable "db_username" {
  default = "postgres"
}

variable "db_password" {
  description = "Database password"
  sensitive   = true
}
