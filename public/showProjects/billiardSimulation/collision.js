import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js'; 

export function ballCollision(ball1, ball2, g, my, energyLoss){
    // velocityIn1, velocityIn2, positionIn1, positionIn2, mass1, mass2, energyLoss

    let v1 = ball1.velocity.clone();
    let v2 = ball2.velocity.clone();
    let p1 = ball1.position.clone();
    let p2 = ball2.position.clone();
    let mass1 = ball1.mass;
    let mass2 = ball2.mass;

    let velocityOut1 = new THREE.Vector3(  0.0, 0.0, 0.0 );
    let velocityOut2 = new THREE.Vector3(  0.0, 0.0, 0.0 );

    let p1Diff = new THREE.Vector3(  0.0, 0.0, 0.0 );
    let p2Diff = new THREE.Vector3(  0.0, 0.0, 0.0 );
    let v1Diff  = new THREE.Vector3(  0.0, 0.0, 0.0 );
    let v2Diff = new THREE.Vector3(  0.0, 0.0, 0.0 );

    p1Diff.subVectors(p1,p2);
    p2Diff.subVectors(p2,p1);
    v1Diff.subVectors(v1,v2);
    v2Diff.subVectors(v2,v1);

    // Vector3 bibloteket har så rolig syntax så det blir ekvationen här nere som blir [*] och [**]
    velocityOut1.subVectors(v1, p1Diff.multiplyScalar(v1Diff.dot(p1Diff)).divideScalar(p1.distanceToSquared(p2))).multiplyScalar(1 - energyLoss)
    velocityOut2.subVectors(v2, p2Diff.multiplyScalar(v2Diff.dot(p2Diff)).divideScalar(p2.distanceToSquared(p1))).multiplyScalar(1 - energyLoss)
    velocityOut1.y = 0.0;
    velocityOut2.y = 0.0;

    let ball1out = ball1;
    let ball2out = ball2;   

    // Stannar bollen om hastigheten är liten
    if((Math.abs(velocityOut1.x) < 0.04 && Math.abs(velocityOut1.z) < 0.04)){
        velocityOut1.x = 0.0;
        velocityOut1.z = 0.0;
    }
    if((Math.abs(velocityOut2.x) < 0.04 && Math.abs(velocityOut2.z) < 0.04)){
        velocityOut2.x = 0.0;
        velocityOut2.z = 0.0;
    }
/*
    if(Math.abs(velocityOut1.x) > 1.4 || Math.abs(velocityOut1.z) > 1.4 || Math.abs(velocityOut2.x) > 1.4 || Math.abs(velocityOut2.z) > 1.4){
        var audio = new Audio('./ogg/testHitt.ogg');
        audio.play();
    }
*/
    ball1out.velocity = velocityOut1;
    ball2out.velocity = velocityOut2;
    ball1out.position = ball1.prevPosition;
    ball2out.position = ball2.prevPosition;

   // if(ball1.velocity == 0){ ball1out.acceleration = mass1 * g * my;}
   // if(ball2.velocity == 0){ball2out.acceleration = mass2 * g * my;}

    // [*] v1ny = (v1 - 2*m2/(m1 + m2)*(v1-v2).*(p1-p2)/abs(abs(p1-p2)).^2*(p1-p2)*lossE);
    //[**] v2ny = (v2 - 2*m1/(m1 + m2)*(v2-v1).*(p2-p1)/abs(abs(p2-p1)).^2*(p2-p1))*lossE;

    return [ball1out, ball2out];
}

export function wallDetection(ball, energyLoss){
    let positionIn = ball.position;
    let velocityIn = ball.velocity;
    let radius = ball.radius;
    
    if(positionIn.x+radius > 2.87/2){
        velocityIn.x = -1*Math.abs(velocityIn.x)*(1 -energyLoss);
        ball.position.x = ball.prevPosition.x;
    }
    else if(positionIn.x-radius < -2.87/2){
        velocityIn.x = 1*Math.abs(velocityIn.x)*(1 -energyLoss);
        ball.position.x = ball.prevPosition.x;
    }
    else if(positionIn.z+radius > 1.27/2){
        velocityIn.z = -1*Math.abs(velocityIn.z)*(1 - energyLoss);
        ball.position.z = ball.prevPosition.z; 
       }
    else if(positionIn.z-radius < -1.27/2){
        velocityIn.z = 1*Math.abs(velocityIn.z)*(1 -energyLoss);
        ball.position.z = ball.prevPosition.z;
        }

}

