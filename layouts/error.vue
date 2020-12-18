<template>
  <div style="text-align: center">
    <img
      src="https://media1.tenor.com/images/a8e90f353fb202df176000ad8b108cdb/tenor.gif?itemid=16300873"
      alt=""
    />
    <br />
    <h1>Error!</h1>
    {{ error.message }} {{ error.statusCode }}
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  head() {
    return {
      title: 'Error',
    }
  },
}
</script>
