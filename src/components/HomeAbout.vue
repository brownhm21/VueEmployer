<template>
  <main class="hero pt-10" height="900">
    <div class="blur hero-blur"></div>

    <section class="left-hero ml-15">
      

      <div class="slider-left">
        <div></div>
        <span>Employerella</span>
      </div>

      <h1 class="text-left">
        <div>
          <span class="stroke-text">Controll </span>
          <span>Your</span>
        </div>

        <div>
          <span>Ideal Ressources</span>
        </div>

        <span class="subtitle-text">In here we will help you to controll and build your ideal ressources and live up your life to fullest</span>
      </h1>

      <div class="indexes-left">
        <div>
          <span>+140</span>
          <span>Expert Ceo</span>
        </div>

        <div>
          <span>+978</span>
          <span>Members joined</span>
        </div>

        <div>
          <span>+50</span>
          <span>Active programs</span>
        </div>
      </div>

      <div class="buttons-left">
        <button class="btn">Get Started</button>
        <button class="btn">Learn More</button>
      </div>
    </section>

    <section class="right-hero ">
      

<!-- <div class="heart-rate">
  <img
    alt="Heart Icon"
    src=""
  />
  <span>Heart Rate</span>
  <span>116 bpm</span>
</div> -->

<img
  alt="Running Man"
  src="../assets/img/sever.png"
  class="image-left"
/>
<!-- <img
  alt="Background Running Man"
  src=""
  class="image-back-left"
/> -->

<!-- <div class="calories-card-left">
  <img
    alt="Graph Icon"
    src=""
    class="image-calories"
  />
  <p>
    <span>Calories burned</span>
    <span>220 kcal</span>
  </p>
</div> -->
    </section>

    <div class="svg-border-waves">
        <img src="@/assets/img/wave2.svg" />
      </div>

      <hr />
  </main>
</template>
  
  <script>
 
  
  export default {
    name: 'HeroSection',
  
    
  };
  </script>
  
  <style scoped>
  main {
    display: flex;
    justify-content: space-between;
  }

  main > hr {
  border: 1px solid var(--lightgray);
}
  
  .hero-blur {
    height: 30rem;
    left: 0;
    width: 22rem;
  }
  
  .left-hero {
    display: flex;
    flex: 3;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    padding-top: 1.5rem;
  }
  
  .slider-left {
    color: white;
    background-color: #363d42;
    text-transform: uppercase;
  
    align-items: center;
    border-radius: 4rem;
    display: flex;
    justify-content: flex-start;
    margin-top: 4rem;
    padding: 20px 14px;
    position: relative;
    width: fit-content;
  }
  
  .slider-left > span {
    z-index: 2;
  }
  
  .slider-left > div {
    background-color: var(--blue);
    border-radius: 3rem;
    height: 80%;
    left: 8px;
    position: absolute;
    width: 5.4rem;
    z-index: 1;
  }
  
  .text-left {
    color: white;
    font-size: 4.5rem;
    text-overflow: inherit;
    text-transform: uppercase;
  
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .subtitle-text {
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 1px;
    text-transform: none;
    width: 80%;
  }
  
  .indexes-left {
    display: flex;
    gap: 2rem;
  }
  
  .indexes-left > div {
    display: flex;
    flex-direction: column;
  }
  
  .indexes-left > div > span:first-child {
    color: white;
    font-size: 2rem;
  }
  
  .indexes-left > div > span:last-child {
    color: var(--gray);
    text-transform: uppercase;
  }
  
  .buttons-left {
    display: flex;
    font-weight: normal;
    gap: 1rem;
  }
  
  .buttons-left > :first-child {
    background-color: var(--blue);
    color: white;
    width: 8rem;
  }
  
  .buttons-left > :last-child {
    background-color: transparent;
    border: 2px solid var(--blue);
    color: white;
    width: 8rem;
  }
  
  /* .right-hero {
    background-color: var(--blue);
    flex: 1;
    position: relative;
  } */
  
  .right-hero > .btn {
    color: black;
    position: absolute;
    right: 3rem;
    top: 2rem;
  }
  
  .heart-rate {
    background-color: var(--darkGrey);
    align-items: flex-start;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    position: absolute;
    right: 4rem;
    top: 7rem;
    width: fit-content;
  }
  
  .heart-rate > img {
    width: 2rem;
  }
  
  .heart-rate > :nth-child(2) {
    color: var(--gray);
  }
  
  .heart-rate > :nth-child(3) {
    color: white;
    font-size: 1.5rem;
  }
  
  .image-left {
    position: absolute;
    right: 3rem;
    top: 10rem;
    width: 40rem;
  }
  
  .image-back-left {
    position: absolute;
    right: 20rem;
    top: 4rem;
    width: 15rem;
    z-index: -1;
  }
  
  .calories-card-left {
    background-color: var(--caloryCard);
    border-radius: 5px;
    display: flex;
    gap: 2rem;
    padding: 1rem;
    position: absolute;
    right: 28rem;
    top: 32rem;
    width: fit-content;
  }
  
  .calories-card-left > img {
    width: 4rem;
  }
  
  .calories-card-left > p {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .calories-card-left > p > :nth-child(1) {
    color: var(--gray);
  }
  
  .calories-card-left > p > :nth-child(2) {
    color: white;
    font-size: 1.5rem;
  }
  </style>
  