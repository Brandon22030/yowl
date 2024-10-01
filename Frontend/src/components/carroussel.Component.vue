<style>
      * {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        box-sizing: border-box;
      }

      .container {
        height: 10%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .carousel__buttons {
        margin: 10px 0;
        display: flex;
        width: 80%;
      }
      .carousel__buttons .carousel-button:focus {
        background-color: rgb(154, 163, 247);
      }
      .carousel__buttons .carousel-button:hover {
        background-color: #ddd;
      }
      .carousel__buttons .carousel-button:not(:nth-last-child()) {
        margin-right: 10px;
      }
       .carousel-button {
        font-size: 1rem;
        margin-right: 10px;
        box-shadow: 0 4px 8px #eee;
        padding: 0.5rem 0.8rem;
        cursor: pointer;
        border: 1px solid #ddd;
        color: #454545;
        border-radius: 50%;
        height: 40px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
      }
      .carousel__buttons{
        display: flex;
        width: 200px;
        align-items: center;
        justify-content: space-evenly;
      }
      .carousel {
        width: 50%;
        border: 1px solid rgb(206, 206, 206);
        overflow: hidden;
        display: grid;
        border-radius: 5px;
        box-shadow: 0 4px 8px #eee;
        padding: 20px;
        grid-template-columns: repeat(6, 90%);
      }
      .carousel .carousel__item.active {
        transform: scale(1) translateX(-0%);
      }
      .carousel .carousel__item {
        width: 100%;
        transform: translateX(-0%) scale(0.9);
        border-radius: 5px;
        transition: all 0.7s ease;
        display: flex;

        background-color: gray;
        text-transform: uppercase;
        justify-content: center;

        align-items: center;
        padding: 10px;
        height: 200px;
      }
      .bg-yellow.active {
        background: darkslategrey;
        color: white;
      }
      .bg-brown.active {
        background-color: rosybrown;
      }
      .bg-green.active {
        background-color: greenyellow;
      }
      .bg-blue.active {
        background-color: dodgerblue;
        background-image: url(https://lyceechevreullestonnac.marienotredamelyon.fr/wp-content/uploads/sites/17/2019/12/Image-de-la-libert%C3%A9.jpg);
        background-repeat: no-repeat;
        background-size: cover;
      }
    </style>
  <template>
    <div class="container">
      <div class="carousel">
        <div class="carousel__item bg-yellow active">
          <p>Caraousel 1</p>
        </div>
        <div class="carousel__item bg-green">
          <p>Caraousel 2</p>
        </div>
        <div class="carousel__item bg-brown">
          <p>Caraousel 3</p>
        </div>
        <div class="carousel__item bg-blue">
          <p>Caraousel 4</p>
        </div>
        <div class="carousel__item bg-yellow">
          <p>Caraousel 5</p>
        </div>
        <div class="carousel__item bg-blue">
          <p>Caraousel 6</p>
        </div>
      </div>
      <div class="carousel__buttons">
        <button type="button" class="carousel-button">&#10094;</button>
        <button type="button" class="carousel-button">&#10095;</button>
      </div>
    </div>
</template>
    <script>
      const carousel = document.querySelector('.carousel')
      let carouselItems = document.querySelectorAll('.carousel__item')
      const [btnLeftCarousel, btnRightCarousel] = document.querySelectorAll('.carousel-button')
      let carouselCount = carouselItems.length
      let pos = 0
      let translateX = 0

      btnLeftCarousel.addEventListener('click', (e) => {
        let calculate = pos > 0 ? (pos - 1) % carouselCount : carouselCount
        if (pos > 0) translateX = pos === 1 ? 0 : translateX - 100.5
        else if (pos <= 0) {
          translateX = 100.5 * (carouselCount - 1)
          calculate = carouselCount - 1
        }

        console.log(pos)

        pos = slide({
          show: calculate,
          disable: pos,
          translateX: translateX
        })
      })

      btnRightCarousel.addEventListener('click', (e) => {
        let calculate = (pos + 1) % carouselCount
        if (pos >= carouselCount - 1) {
          calculate = 0
          translateX = 0
        } else {
          translateX += 100.5
        }

        pos = slide({
          show: calculate,
          disable: pos,
          translateX: translateX
        })
      })

      function slide(options) {
        function active(_pos) {
          carouselItems[_pos].classList.toggle('active')
        }

        function inactive(_pos) {
          carouselItems[_pos].classList.toggle('active')
        }

        inactive(options.disable)
        active(options.show)

        document.querySelectorAll('.carousel__item').forEach((item, index) => {
          if (index === options.show) {
            item.style.transform = translateX(-${options.translateX}%) scale(1)
          } else {
            item.style.transform = translateX(-${options.translateX}%) scale(0.9)
          }
        })

        return options.show
      }
    </script>