provider "aws" {
  profile    = "default"
  region     = "eu-north-1"
}

resource "aws_ecr_repository" "fuzzy-garbanzo" {
  name                 = "fuzzy-garbanzo"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
