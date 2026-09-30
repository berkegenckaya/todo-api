terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

variable "region" {
  type    = string
  default = "eu-central-1"
}

variable "env" {
  type    = string
  default = "dev"
}

variable "bucket_suffix" {
  type = string
}

resource "aws_s3_bucket" "artifacts" {
  bucket = "todo-api-${var.env}-${var.bucket_suffix}"

  tags = {
    Project = "todo-api"
    Env     = var.env
  }
}

resource "aws_s3_bucket_public_access_block" "artifacts" {
  bucket                  = aws_s3_bucket.artifacts.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_ecr_repository" "app" {
  name         = "todo-api-${var.env}"
  force_delete = true

  image_scanning_configuration {
    scan_on_push = true
  }
}

output "bucket_name" {
  value = aws_s3_bucket.artifacts.bucket
}

output "ecr_url" {
  value = aws_ecr_repository.app.repository_url
}