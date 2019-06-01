document.getElementById('alert').addEventListener('click', function () {
  alert('document.getElementByIdのalert');
});;

$('#alert').on('click', function () {
  console.log('jQueryのalert');
  alert('jQueryのalert');
});
