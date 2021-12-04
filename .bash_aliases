alias docker-build='docker build --tag text-summarization-ui:latest .'
alias docker-run='docker run -p 3100:80  text-summarization-ui:latest'
alias docker-build-run='docker-build; docker-run'