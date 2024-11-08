// main.js
window.onload = () => {
    // Verificar si hay un usuario en la sesión
    const currentUser = localStorage.getItem("currentUser");
  
    if (currentUser) {
      // Si hay un usuario logueado, mostrar el flujo correspondiente
      if (currentUser === "admin") {
        alert("Bienvenido, Admin, segurisimo");
        // Aquí puedes agregar lógica adicional para el flujo del admin
      } else if (currentUser === "user1") {
        console.log("Bienvenido, User1!");
        // Aquí puedes agregar lógica para el flujo de User1
      } else if (currentUser === "user2") {
        console.log("Bienvenido, User2!");
        // Aquí puedes agregar lógica para el flujo de User2
      }
    } else {
      console.log("No hay usuario logueado.");
      // Aquí puedes redirigir a la página de login si no hay usuario logueado
    }
  };
  
  // Función para cerrar sesión
  function logout() {
    // Eliminar el usuario de la sesión
    localStorage.removeItem("currentUser");
    console.log("Sesión cerrada.");
    // Redirigir al login
    window.location.reload(); // Recargar la página para actualizar el flujo
  }
  