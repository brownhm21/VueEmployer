<template>
    <section id="about">
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="10">
            <v-row align="center" justify="center">
              <v-col cols="12" md="7">
                <h1 class="font-weight-light display-2">About</h1>
                <h1 class="font-weight-light display-1 mb-3">
                  Take advantage of our services!
                </h1>
                <v-row>
                  <v-col cols="12" class="d-flex align-center">
                    <v-img
                      src="@/assets/img/icon1.svg"
                      max-width="60px"
                      class="mr-4"
                    />
                    <p class="text-justify">
                      Our intuitive control panel gives you admin access to all of your DreamHost products. 
                      Easily update domain information, add users, adjust email settings, 
                      gain access to promotions and more.
                    </p>
                  </v-col>
                  <v-col cols="12" class="d-flex align-center">
                    <v-img
                      src="@/assets/img/icon2.svg"
                      max-width="60px"
                      class="mr-4"
                    />
                    <p class="text-justify">
                      Create unlimited addresses with POP/IMAP/SMTP accounts,
                      plus support for autoresponders, webmail, filtering, and advanced spam protection.
                      Not included with "Shared Starter."
                    </p>
                  </v-col>
                  <v-col cols="12" class="d-flex align-center">
                    <v-img
                      src="@/assets/img/icon3.svg"
                      max-width="60px"
                      class="mr-4"
                    />
                    <p class="text-justify">
                      Tech veterans, geeks, and nerds are all standing by to optimize your experience.
                       Whether you get in touch with our support, read our knowledge base,
                        or start a thread in our community forum — getting answers is easy.
                    </p>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="5" class="d-none d-md-flex">
                <v-img
                  src="@/assets/img/ill1.svg"
                  class="d-block ml-auto mr-auto"
                  max-width="400px"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </template>
  
  <style scoped>
  #about {
    background-color: #f4f7f5;
  }
  </style>