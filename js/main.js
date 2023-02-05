
{
  (function() {
    'use strict';

    var scene;
    var box; // mesh
    var light;
    var ambient;
    var camera;
    var gridHelper;
    var axisHelper;
    var lightHelper;
    var renderer;
    // var width = 500;
    // var height =250;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var theta = 0;
    var loader;
    var text;

    // scene ステージ
    scene = new THREE.Scene();

    // mesh 物体
    // - geometry 形状
    // - material 材質
    box = new THREE.Mesh(
      new THREE.BoxGeometry(50, 50, 50),
      new THREE.MeshLambertMaterial({ color: 0xff0000 })
    );
    box.position.set(0, 0, 0);
    box.rotation.y = 20 * Math.PI / 180;
    // scene.add(box);

    // light
    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 100, 30);
    scene.add(light);
    ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient);

    // camera
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(200, 100, 300);
    camera.lookAt(scene.position);

    // background
    const urls = [
      "images/nzw.png",
      "images/nzw.png",
      "images/nzw.png",
      "images/nzw.png",
      "images/nzw.png",
      "images/nzw.png",
    ];
    
    loader = new THREE.CubeTextureLoader();
    scene.background = loader.load(urls);

    // helper
    gridHelper = new THREE.GridHelper(200, 50);
    scene.add(gridHelper);
    axisHelper = new THREE.AxesHelper(1000);
    scene.add(axisHelper);
    lightHelper = new THREE.DirectionalLightHelper(light, 20);
    scene.add(lightHelper);

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0xefefef);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById("stage").appendChild(renderer.domElement);

    // texture
    loader = new THREE.FontLoader();
    loader.load('helvetiker_bold.typeface.json', function(font) {
      createText(font);
      render();
      
    });

    function createText(font) {
      // text
      text = new THREE.Mesh(
        new THREE.TextGeometry('!', {
          font: font,
          size: 24,
          height: 4
        }),
        new THREE.MeshBasicMaterial({ color: 0xf39800, side: THREE. DoubleSide })
      );
      scene.add(text);
    }


    function render() {
      requestAnimationFrame(render);

      theta += 0.1;
      camera.position.x = Math.cos(theta * Math.PI / 180) * 300;
      camera.position.z = Math.sin(theta * Math.PI / 180) * 300;
      camera.lookAt(scene.position);
      box.rotation.y -= 0.01;

      renderer.render(scene, camera);
    }
    render();

    renderer.render(scene, camera);
  })();
}