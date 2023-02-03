<template>
    <v-row>
    <v-col cols="12">
      <v-card title="Account Details">
        <v-card-text class="d-flex">
          <!-- 👉 Avatar -->
          <v-avatar
            rounded="lg"
            size="100"
            class="me-6"
            :image=""
          />

          <!-- 👉 Upload Photo -->
          <form
            ref="refForm"
            class="d-flex flex-column justify-center gap-5"
          >
            <div class="d-flex flex-wrap gap-2">
              <v-btn
                color="primary"
                @click=""
              >
                <v-icon
                  icon="mdi-cloud-upload-outline"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Upload new photo</span>
              </v-btn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input=""
              >

              <v-btn
                type="reset"
                color="error"
                variant="tonal"
                @click=""
              >
                <span class="d-none d-sm-block">Reset</span>
                <v-icon
                  icon="mdi-refresh"
                  class="d-sm-none"
                />
              </v-btn>
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </v-card-text>

        <v-divider />

        <v-card-text>
          <!-- 👉 Form -->
          <v-form class="mt-6">
            <v-row>
              <!-- 👉 First Name -->
              <v-col
                md="6"
                cols="12"
              >
                <v-text-field
                  v-model=""
                  label="First Name"
                />
              </v-col>

              <!-- 👉 Last Name -->
              <v-col
                md="6"
                cols="12"
              >
                <v-text-field
                  v-model=""
                  label="Last Name"
                />
            </v-col>

              <!-- 👉 Email -->
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model=""
                  label="E-mail"
                  type="email"
                />
              </v-col>

              <!-- 👉 Organization -->
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model=""
                  label="Organization"
                />
              </v-col>

              <!-- 👉 Phone -->
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model=""
                  label="Phone Number"
                />
              </v-col>

              <!-- 👉 Address -->
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="accountDataLocal.address"
                  label="Address"
                />
              </v-col>

              <!-- 👉 State -->
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="accountDataLocal.state"
                  label="State"
                />
              </v-col>

              <!-- 👉 Zip Code -->
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="accountDataLocal.zip"
                  label="Zip Code"
                />
              </v-col>

              <!-- 👉 Country -->
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  v-model="accountDataLocal.country"
                  label="Country"
                  :items="['USA', 'Canada', 'UK', 'India', 'Australia']"
                />
              </v-col>

             

              <!-- 👉 Timezone -->
              

              

              <!-- 👉 Form Actions -->
              <v-col
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <v-btn>Save changes</v-btn>

                <v-btn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click.prevent=""
                >
                  Reset
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>   
        <!-- v-card-text -->
      </v-card>
    </v-col>
    </v-row>

</template>