function myFunction(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Get the image text
    var imgText = document.getElementById("imgtext");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = imgs.alt;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
  }



  let slideIndex = [1,1];
let slideId = ["mySlides1", "mySlides2"]
showSlides(1, 0);
showSlides(1, 1);

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  let i;
  let x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {slideIndex[no] = 1}    
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex[no]-1].style.display = "block";  
}




function STLViewer(model, elementID) {
    var elem = document.getElementById(elementID)
}

var camera = new THREE.PerspectiveCamera(70, 
    elem.clientWidth/elem.clientHeight, 1, 1000);

var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(elem.clientWidth, elem.clientHeight);
elem.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
    renderer.setSize(elem.clientWidth, elem.clientHeight);
    camera.aspect = elem.clientWidth/elem.clientHeight;
    camera.updateProjectionMatrix();
}, false);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.rotateSpeed = 0.05;
controls.dampingFactor = 0.1;
controls.enableZoom = true;
controls.autoRotate = true;
controls.autoRotateSpeed = .75;

var scene = new THREE.Scene();
scene.add(new THREE.HemisphereLight(0xffffff, 1.5));

(new THREE.STLLoader()).load(model), function (geometry) {
    var material = new THREE.MeshPhongMaterial({ 
        color: 0xff5533, 
        specular: 100, 
        shininess: 100 });
    var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh); }

var middle = new THREE.Vector3();
geometry.computeBoundingBox();
geometry.boundingBox.getCenter(middle);
mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation( 
                                -middle.x, -middle.y, -middle.z ) );

var largestDimension = Math.max(geometry.boundingBox.max.x,
                            geometry.boundingBox.max.y, 
                            geometry.boundingBox.max.z)
camera.position.z = largestDimension * 1.5;


var largestDimension = Math.max(geometry.boundingBox.max.x,
    geometry.boundingBox.max.y, 
    geometry.boundingBox.max.z)
camera.position.z = largestDimension * 1.5;

var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}; 

