<template>
    <div class="home">
        {{ info }}
    </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
    name: "Home",
    components: {},
    data() {
        return {
            info: null,
        };
    },
    mounted() {
        axios
            .get("https://api.coindesk.com/v1/bpi/currentprice.json")
            .then((response) => (this.info = response));
    },
};
</script>
