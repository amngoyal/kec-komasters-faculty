<template>
    <v-container>
        <v-card flat outlined>

            <v-container>

            </v-container>

        </v-card>
    </v-container>

</template>
<script>

    export default {
        props: {
            questionNumber: Number,
            questionText: String,
            points: Number,
            options: Array,
        },
        data: () => {
            return {
                correct: '',
            }
        },

        methods: {
            optionBackgroundColor(index) {

                if (this.correctOptionIndex === index) {
                    return 'green'
                }


            }

        }

    }
</script>
<style scoped>
</style>
