<template>
  <div id="app-container">
    <router-view/>
  </div>
</template>

<style>
  body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f4f4f9; color: #333; }
  #app-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; }
  .auth-container { width: 100%; max-width: 400px; padding: 40px; background: white; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-radius: 8px; }
  h1, h2 { text-align: center; color: #5a67d8; }
  input { display: block; width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; font-size: 16px; }
  button { width: 100%; padding: 12px; border: none; background-color: #5a67d8; color: white; border-radius: 4px; cursor: pointer; font-size: 16px; font-weight: bold; }
  button:hover { background-color: #434190; }
  p { text-align: center; }
  a { color: #5a67d8; text-decoration: none; }
  .dashboard-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); width: 100vw; position: absolute; top: 0; left: 0; box-sizing: border-box; }
  .dashboard-main { padding-top: 100px; }
</style>