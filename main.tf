provider "aws" {
  profile    = "default"
  region     = "eu-north-1"
}

resource "aws_ecr_repository" "ystromm_fuzzy-garbanzo" {
  name                 = "ystromm/fuzzy-garbanzo"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
