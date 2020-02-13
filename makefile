all: clean gen


clean:
	@rm -rf ./patches

gen:
	gen-patches

reseed:
	@echo "TODO - reseed sript"

.PHONY: gen clean
