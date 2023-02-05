// すべての読み込みが終わってからThree.js関連の処理を実行します
// function init() {
//   var scene = new THREE.Scene();
//   var aspect = window.innerWidth / window.innerHeight;
//   var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
//   var renderer = new THREE.WebGLRenderer();
//   // var controls = new THREE.OrbitControls(camera);
//   var axis = new THREE.AxisHelper(1000);
//   var light = new THREE.DirectionalLight(0xb4e7f2, 1.5);
//   light.position.set(1,1,1);
//   light.target.position.set(0,0,0);
//   scene.add(axis);
//   scene.add(light);
//   scene.add(light.target);
//   renderer.setSize(window.innerWidth, window.innerHeight);	// 描写範囲
//   // document.body.appendChild(renderer.domElement);
//   document.getElementById("stage").appendChild(renderer.domElement);
//   camera.position.set(50, 50, 200);
//   var loader = new THREE.FontLoader();
//   // フォント情報を読み込み
//   loader.load('js/helvetiker_regular.typeface.json', function(font){
//     // どの様な文字を書くか設定
//     var textGeometry = new THREE.TextGeometry("Hello Three.js!", {
//       font: font,
//       size: 20,
//       height: 5,
//       curveSegments: 12
//     });
//     // 材質の設定
//     var materials = [
//       new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 } ),
//       new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: 0.5 } )
//     ];
//     // 文字列メッシュの作成
//     var textMesh = new THREE.Mesh(textGeometry, materials);
//     // 画面に文字列メッシュを追加
//     scene.add(textMesh);
//   });
//   // 描写処理の指定
//   var render = function () {
//     requestAnimationFrame(render);
//     // controls.update();
//     renderer.setClearColor(0xaabbcc, 1.0);
//     renderer.render(scene, camera);
//   };
//   // 画面に描写
//   render();
// }

var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
// var controls = new THREE.OrbitControls(camera);
var axis = new THREE.AxesHelper(1000);
var light = new THREE.DirectionalLight(0xb4e7f2, 1.5);
light.position.set(1,1,1);
light.target.position.set(0,0,0);
scene.add(axis);
scene.add(light);
scene.add(light.target);
renderer.setSize(window.innerWidth, window.innerHeight);	// 描写範囲
// document.body.appendChild(renderer.domElement);
document.getElementById("stage").appendChild(renderer.domElement);
camera.position.set(50, 50, 200);
var loader = new THREE.FontLoader();
// フォント情報を読み込み
loader.load('js/helvetiker_regular.typeface.json', function(font){
  // どの様な文字を書くか設定
  var textGeometry = new THREE.TextGeometry("Hello Three.js!", {
    font: font,
    size: 20,
    height: 5,
    curveSegments: 12
  });
  // 材質の設定
  var materials = [
    new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 } ),
    new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: 0.5 } )
  ];
  // 文字列メッシュの作成
  var textMesh = new THREE.Mesh(textGeometry, materials);
  // 画面に文字列メッシュを追加
  scene.add(textMesh);
});
// 描写処理の指定
var render = function () {
  requestAnimationFrame(render);
  // controls.update();
  renderer.setClearColor(0xaabbcc, 1.0);
  renderer.render(scene, camera);
};
// 画面に描写
render();