var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// Membuat elemen audio
//var audio = new Audio();

// Memuat file musik
// audio.src = 'audio/pokemon.mp3';

// Memutar musik
//function playMusic() {
//  audio.play();
//}

// Menghentikan musik
// function stopMusic() {
//  audio.pause();
//  audio.currentTime = 0;
//}

        // Ukuran blok dan jumlah blok pada sumbu x dan y
        var blockSizeX = 25;
        var blockSizeY = 25;
        var numBlocksX = canvas.width / blockSizeX;
        var numBlocksY = canvas.height / blockSizeY;

        // Variabel untuk menyimpan skor
         var score = 0;

// Fungsi untuk menggambar skor
function drawScore() {
    context.fillStyle = "#fff";
    context.font = "16px Arial";
    context.fillText("Score: " + score, 10, 20);
}


        // Inisialisasi posisi awal ular
        var snake = [
            { x: 0, y: 0 }
        ];

        // Inisialisasi posisi makanan
        var food = {
            x: Math.floor(Math.random() * numBlocksX),
            y: Math.floor(Math.random() * numBlocksY)
        };

        // Mendapatkan referensi ke tombol-tombol kontrol di perangkat seluler
        var upButton = document.getElementById("upButton");
        var leftButton = document.getElementById("leftButton");
        var downButton = document.getElementById("downButton");
        var rightButton = document.getElementById("rightButton");

        // Variabel untuk menyimpan arah pergerakan ular
        var direction = "right";

        // Fungsi untuk menggambar ular dan makanan
        function draw() {
            // Hapus canvas sebelum menggambar frame baru
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Gambar ular
            for (var i = 0; i < snake.length; i++) {
                var blockX = snake[i].x * blockSizeX;
                var blockY = snake[i].y * blockSizeY;
                context.fillStyle = "#fff";
                context.fillRect(blockX, blockY, blockSizeX, blockSizeY);
            }

            // Gambar makanan
            var foodX = food.x * blockSizeX;
            var foodY = food.y * blockSizeY;
            context.fillStyle = "#f00";
            context.fillRect(foodX, foodY, blockSizeX, blockSizeY);
        }



        function death() {
    // Mendapatkan posisi kepala ular
    var headX = snake[0].x;
    var headY = snake[0].y;


    // Mengecek apakah kepala ular menabrak batas layar
    if (headX < 0 || headY < 0 || headX >= numBlocksX || headY >= numBlocksY) {
        // Reset permainan ke keadaan awal
        snake = [{ x: 0, y: 0 }];
     //   stopMusic(); // Menghentikan musik saat game over
        alert("Game Over!");
        score = 0;
        direction = "right";
      //  stopMusic();
        food.x = Math.floor(Math.random() * numBlocksX);
        food.y = Math.floor(Math.random() * numBlocksY);
    }
}

        // Fungsi untuk mengupdate permainan
        function update() {
            // Menggerakkan ular berdasarkan input pemain
            if (direction === "right") {
                moveRight();
            } else if (direction === "left") {
                moveLeft();
            } else if (direction === "up") {
                moveUp();
            } else if (direction === "down") {
                moveDown();
            }

            // Perbarui posisi makanan jika ular memakannya
            if (snake[0].x === food.x && snake[0].y === food.y) {
                food.x = Math.floor(Math.random() * numBlocksX);
                food.y = Math.floor(Math.random() * numBlocksY);
               
               
               // Tambahkan skor
                 score += 10;
                // Tambahkan bagian baru ke ular
                var tail = {
                    x: snake[snake.length - 1].x,
                    y: snake[snake.length - 1].y
                };
                snake.push(tail);
                
            }

            // Perbarui posisi ular
            var head = {
                x: snake[0].x,
                y: snake[0].y
            };
            snake.pop();
            snake.unshift(head);


            //fungsi mati
            death();
            
            // Gambar ulang frame permainan
            draw();
            playMusic();
            
            //gambar score
            drawScore();
        }

        // Fungsi untuk menggerakkan ular ke kanan
        function moveRight() {
            var newHead = {
                x: snake[0].x + 1,
                y: snake[0].y
            };
            snake.unshift(newHead);
            snake.pop();
        }

        // Fungsi untuk menggerakkan ular ke kiri
        function moveLeft() {
            var newHead = {
                x: snake[0].x - 1,
                y: snake[0].y
            };
            snake.unshift(newHead);
            snake.pop();
        }

        // Fungsi untuk menggerakkan ular ke atas
        function moveUp() {
            var newHead = {
                x: snake[0].x,
                y: snake[0].y - 1
            };
            snake.unshift(newHead);
            snake.pop();
        }

        // Fungsi untuk menggerakkan ular ke bawah
        function moveDown() {
            var newHead = {
                x: snake[0].x,
                y: snake[0].y + 1
            };
            snake.unshift(newHead);
            snake.pop();
        }

        // Fungsi untuk mengubah arah pergerakan ular berdasarkan input pemain
        function changeDirection(event) {
            var key = event.keyCode;
            if (key === 37 && direction !== "right") {
                direction = "left";
            } else if (key === 38 && direction !== "down") {
                direction = "up";
            } else if (key === 39 && direction !== "left") {
                direction = "right";
            } else if (key === 40 && direction !== "up") {
                direction = "down";
            }
        }

        // Fungsi utama permainan
        function main() {
            // Update permainan setiap 100ms (10 frame per detik)
            setInterval(update, 100);

            // Mengatur event listener untuk input keyboard
            document.addEventListener("keydown", changeDirection);

            // Mengatur event listener untuk tombol-tombol kontrol di perangkat seluler
            upButton.addEventListener("click", function() {
                if (direction !== "down") {
                    direction = "up";
                }
            });
            leftButton.addEventListener("click", function() {
                if (direction !== "right") {
                    direction = "left";
                }
            });
            downButton.addEventListener("click", function() {
                if (direction !== "up") {
                    direction = "down";
                }
            });
            rightButton.addEventListener("click", function() {
                if (direction !== "left") {
                    direction = "right";
                }
            });

            // Mengatur tampilan tombol-tombol kontrol di perangkat seluler jika dimainkan di perangkat seluler
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                document.getElementById("mobileControls").style.display = "block";
            }
        }

        // Panggil fungsi utama permainan untuk memulai permainan
        main();
     //   playMusic();
        alert("This Music From Pokemon Alpha");
        alert("Happy Playing!");