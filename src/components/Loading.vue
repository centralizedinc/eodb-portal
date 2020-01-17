<template>
  <div id="loading-wrapper">
    <div id="loading-text">SmartJuan24</div>
    <div id="loading-subtext">One Stop Shop eGovernment Service</div>
    <div id="loading-content"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#loading-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

#loading-text {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  color: rgb(20, 55, 121);
  width: 100px;
  height: 30px;
  margin: -20px 0 0 -45px;
  text-align: center;
  font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-size: 16px;
}

#loading-subtext {
  display: block;
  position: absolute;
  top: 54%;
  left: 50%;
  color: rgb(20, 55, 121);
  width: 100px;
  height: 30px;
  margin: -1px 0 0 -45px;
  text-align: center;
  font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-size: 12px;
}

#loading-content {
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 180px;
  height: 180px;
  margin: -85px 0 0 -85px;
  border: 3px solid #f00;
}

#loading-content {
  border: 3px solid transparent;
  border-top-color: #4cb8c4;
  border-bottom-color: #3cd3ad;
  border-radius: 50%;
  background-origin: border-box;
  background-clip: content-box, border-box;
  -webkit-animation: loader 2s linear infinite;
  -moz-animation: loader 2s linear infinite;
  -o-animation: loader 2s linear infinite;
  animation: loader 2s linear infinite;
}

@keyframes loader {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
