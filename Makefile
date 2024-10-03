# Определяем переменные
IMAGE_NAME = my-nextjs-app
TAG = latest

# Команда для сборки Docker образа с указанием тега
build:
	docker build -t $(IMAGE_NAME):$(TAG) .

# Команда для запуска контейнера с образом указанного тега
run:
	docker run -p 3000:3000 $(IMAGE_NAME):$(TAG)

# Команда для остановки всех запущенных контейнеров
stop:
	docker stop $$(docker ps -q)

# Команда для очистки контейнеров и образов
clean:
	docker system prune -f

# Команда для запуска сборки и контейнера одной командой
start: build run
