# Node version and commands
NODE_VERSION = 18.15.0
NVM = . ~/.nvm/nvm.sh && nvm
NPM = npm

# Targets
.PHONY: all install_nvm install_node install_backend install_frontend start_backend start_frontend

# Default target
all: install_nvm install_backend install_frontend

# Install NVM
install_nvm:
	@if [ ! -d "$$(echo $$HOME)/.nvm" ]; then \
		echo "Installing NVM..."; \
		curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash; \
		echo "NVM installed. Please restart your terminal or run 'source ~/.bashrc' (or the appropriate config file for your shell)"; \
	fi
	@NVM_DIR="$$(echo $$HOME)/.nvm"; \
	if [ -f "$$(echo $$HOME)/.bashrc" ]; then \
		SHELL_CONFIG="$$(echo $$HOME)/.bashrc"; \
	elif [ -f "$$(echo $$HOME)/.bash_profile" ]; then \
		SHELL_CONFIG="$$(echo $$HOME)/.bash_profile"; \
	elif [ -f "$$(echo $$HOME)/.zshrc" ]; then \
		SHELL_CONFIG="$$(echo $$HOME)/.zshrc"; \
	else \
		echo "Shell configuration file not found. Please source the appropriate config file for your shell manually."; \
		exit 1; \
	fi; \
	export NVM_DIR; \
	[ -s "$$NVM_DIR/nvm.sh" ] && . "$$NVM_DIR/nvm.sh"; \
	[ -s "$$NVM_DIR/bash_completion" ] && . "$$NVM_DIR/bash_completion"

# Install Node.js specific version
install_node: install_nvm
	@echo "Installing Node.js version $(NODE_VERSION)"
	@$(NVM) install $(NODE_VERSION)
	@$(NVM) use $(NODE_VERSION)

# Install backend dependencies
install_backend: install_node
	@echo "Installing api dependencies"
	cd api && $(NPM) install

# Install frontend dependencies
install_frontend: install_node
	@echo "Installing frontend dependencies"
	cd frontend && $(NPM) install

# Start backend server
start_backend:
	@echo "Starting backend server"
	cd api && $(NPM) start

# Start frontend server
start_frontend:
	@echo "Starting frontend server"
	cd frontend && $(NPM) start

