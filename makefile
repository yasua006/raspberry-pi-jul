source=script.js
target=script.ts

$(source): $(target)
	npx tsc

update: $(target)