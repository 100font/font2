(function() {
  'use strict';

  window.onload = function() {
    var loader;

    // シーン
    const scene = new THREE.Scene();

    // アスペクト比
    var aspRatio = window.innerWidth / window.innerHeight;

    // 視野角
    var fov;
    if (aspRatio > 1) {
      fov = 35;
    } else if (aspRatio > 0.9) {
      fov = 45
    } else if (aspRatio > 0.8) {
      fov = 50;
    } else if (aspRatio > 0.6) {
      fov = 60;
    } else if (aspRatio > 0.5) {
      fov = 70;
    } else {
      fov = 80;
    }

    // カメラ
    const camera = new THREE.PerspectiveCamera(fov, aspRatio, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 100;
    camera.lookAt(scene.position);

    // レンダラー
    const webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;
    document.getElementById("stage").appendChild(webGLRenderer.domElement);

    // ライト
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(-100,100,100);
    scene.add(dirLight);

    // テキストと球体を入れるコンテナ
    const container = new THREE.Object3D();
    scene.add(container);

    // テキスト
    let textMesh;
    const textSize = 8;
    const fontLoader = new THREE.FontLoader();
    fontLoader.load("js/helvetiker_bold.typeface.json", function(font) {
      createTextGeometry("A", font, 310);
      createTextGeometry("B", font, 335);
      createTextGeometry("O", font, 0);
      createTextGeometry("U", font, 25);
      createTextGeometry("T", font, 50);
    });

    // background
    // const urls = [
    //   "images/nzw.png",
    //   "images/nzw.png",
    //   "images/nzw.png",
    //   "images/nzw.png",
    //   "images/nzw.png",
    //   "images/nzw.png",
    // ];
    
    // loader = new THREE.CubeTextureLoader();
    // scene.background = loader.load(urls);
    
    // 球体
    const sphereGeometry = new THREE.SphereGeometry(15, 20, 20);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    container.add(sphere); 
    
    // カメラのコントロール
    // const trackballControls = new THREE.TrackballControls(camera);
    // trackballControls.panSpeed = 0.2;
    // trackballControls.rotateSpeed = 3.0;
    // trackballControls.maxDistance = 1000;
    
    /***** 3Dテキスト作成関数 *****/
    function createTextGeometry(text, font, deg) {
      const textGeometry = new THREE.TextGeometry(text, {
        font: font,
        size: textSize,
        height: 1,
        curveSegment: 1
      });
      textGeometry.center();

      const material = new THREE.MeshPhongMaterial({ color: 0xffffff });

      const r = 17
      const phi = 90 * (Math.PI / 180);
      const theta = deg * (Math.PI / 180);
      const sphericalPos = new THREE.Spherical(r, phi, theta);

      textMesh = new THREE.Mesh(textGeometry, material);
      textMesh.position.setFromSpherical(sphericalPos);

      const vector = new THREE.Vector3();
      vector.copy(textMesh.position).multiplyScalar(2);

      textMesh.lookAt(vector);
      container.add(textMesh);
    }

    /***** 描画関数 *****/
    const clock = new THREE.Clock();
    function renderScene() {
      // コンテナを回す(コンテナ中身のテキストと球体も回る)
      container.rotation.y -= 0.03;
      const delta = clock.getDelta();
      // trackballControls.update(delta);
      requestAnimationFrame(renderScene);

      
      webGLRenderer.render(scene, camera);
      
    }

    /***** ウィンドウサイズ変更 *****/
    window.addEventListener("resize", function(){

      // アスペクト比
    var aspRatio = window.innerWidth / window.innerHeight;

      // 視野角
      var fov;
      if (aspRatio > 1) {
        fov = 35;
      } else if (aspRatio > 0.9) {
        fov = 45
      } else if (aspRatio > 0.8) {
        fov = 50;
      } else if (aspRatio > 0.6) {
        fov = 60;
      } else if (aspRatio > 0.5) {
        fov = 70;
      } else {
        fov = 80;
      }

      camera.aspect = aspRatio;
      camera.fov = fov;
      camera.updateProjectionMatrix();
      webGLRenderer.setSize(window.innerWidth, window.innerHeight);
      render();

    });

    // 描画
    renderScene();
  }
})();