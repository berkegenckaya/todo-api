terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

variable "app_env" {
  type    = string
  default = "dev"
}

resource "local_file" "config" {
  filename = "${path.module}/out/${var.app_env}.txt"
  content  = "APP_ENV=${var.app_env}\n"
}