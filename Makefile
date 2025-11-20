# Run commands inside nix-shell
NIX = nix-shell --run

.PHONY: help
help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: ## Install Ruby and Node dependencies
	@echo "Installing dependencies..."
	$(NIX) "bundle install"
	$(NIX) "npm install"

.PHONY: update
update: ## Update dependencies
	@echo "Updating dependencies..."
	$(NIX) "bundle update"
	$(NIX) "npm update"

.PHONY: run-dev
run-dev:  ## Run my blog locally
	@echo "Starting Jekyll server at http://localhost:4000"
	$(NIX) "bundle exec jekyll serve"


.PHONY: build
build: ## Build the static site
	@echo "Building site..."
	$(NIX) "bundle exec jekyll build"

.PHONY: clean
clean: ## Clean generated files
	@echo "Cleaning..."
	$(NIX) "bundle exec jekyll clean"
	rm -rf _site .jekyll-cache

.PHONY: shell
shell: ## Enter nix-shell for manual commands
	@nix-shell

