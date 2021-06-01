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
            .get("http://127.0.0.1:8000/api/users")
            .then((response) => (this.info = response))
            .catch((error) => console.log(error));
    },
};
</script>
