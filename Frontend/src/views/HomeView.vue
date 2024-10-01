<template>
  <section class="overflow-hidden h-screen bg-[#C38D9E] sm:grid sm:grid-cols-2 sm:items-center">
    <div class="bg-white h-full">
      <img src="/images/feedback.png" alt="feedback" class="h-[4rem] mx-[2rem] mt-[1rem]" />
      <img alt="" src="/images/Illustration.png" class="h-[30rem] ml-[5rem]" />
    </div>

    <div>
      <div class=" md:p-12 lg:px-16 lg:py-24">
        <div class="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2
            class="font-['Abhaya_Libre_Medium'] text-[4rem] font-medium leading-[120px] text-[#fff] relative mx-auto my-0"
          >
            WELCOME TO
          </h2>

          <img src="/images/feed.png" alt="feed" class="relative mx-auto my-0 h-[10rem]" />

          <p class="relative mx-auto my-[2rem] text-white">
            The place where you can comment anything on the web.
          </p>

          <div class="mt-4 md:mt-8">
            <RouterLink to="/register">
              <p
                class="inline-block rounded-full bg-[#1977A2] px-[5rem] py-3 text-lg font-['Roboto'] font-black text-white transition hover:bg-blue-700"
              >
                Get Started
              </p>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped></style>
