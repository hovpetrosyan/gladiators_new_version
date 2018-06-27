//console.log(faker.name.findName())
class Cessar{
  kill(gladiator){
    gladiator.health = -1;
  }
  save(gladiator){
    gladiator.health = 50;
  }
}
class Gladiator{
  constructor(health,power,speed,name){
    this.health = health;
    this.power = power;
    this.speed = speed;
    this.name = name;
    this.initial_speed = speed;
    this.initial_health = health;
    this.ready_for_hit = true;
  }
  furiousstate(){
    this.speed *= 3; 
  }
  hit(gladiators){
    let fake_this = this;
    if(this.ready_for_hit == true){
      this.ready_for_hit = false;
      this.timer = setTimeout(function() {
        var opp_nmb = Math.floor(Math.random()*gladiators.length);
        while (gladiators[opp_nmb].name == fake_this.name){
         // console.log("suicide");
          opp_nmb = Math.floor(Math.random()*gladiators.length);
        }
        gladiators[opp_nmb].health-=fake_this.power;/*console.log(gladiators);console.log(gladiators[opp_nmb].health);*/fake_this.ready_for_hit = true;
        console.log(' ['+fake_this.name+' x '+ fake_this.health +'] '+' hits '+' ['+gladiators[opp_nmb].name+' x '+ gladiators[opp_nmb].health+']'+'  with power ' + fake_this.power );
        },(Math.floor(5000/this.speed)));  
    }
  }
}
var gladiators = [];
var cessar = new Cessar();

for (i=0;i<3;i++){
  gladiators.push(new Gladiator((100-Math.floor(Math.random()*20)),(5-(Math.random()*3).toFixed(1)),(5-Math.floor(Math.random()*4)),faker.name.findName()));
}
var tm = setInterval(function(){
  for(i in gladiators){
    if(gladiators.length > 1){
      gladiators[i].speed = gladiators[i].initial_speed*(gladiators[i].health/gladiators[i].initial_health); 
      gladiators[i].hit(gladiators);
      if(gladiators[i].health >= 15 && gladiators[i].health <= 30){
        gladiators[i].furiousstate();
      }
      if(gladiators[i].health < 15){
        gladiators[i].speed = gladiators[i].initial_speed;
      }
      if(gladiators[i].health <= 0 )
      {
        console.log('what to do great Cessar?save him or kill? :)');
        console.log('Cessar:hmmmmmmm');
        console.log('Cessar:hmmmmm');
        if(Math.random()>0.5){
          cessar.kill(gladiators[i]);
          console.log('---------------->');
          console.log(gladiators[i].name + ' has been died');
          console.log('---------------->');
        }
        else{
          cessar.save(gladiators[i]);
          console.log('---------------->');
          console.log(gladiators[i].name + ' has been saved by Great Cessar');
          console.log('---------------->');
        }
        if(gladiators[i].health < 0){
          clearTimeout(gladiators[i].timer);
          gladiators.splice(i,1);
          

        }
        
      }
       if(gladiators.length == 1){
      console.log('------------------------------------------------------------------------------------------------');
      console.log('yeah,,,the battle has finished');
      console.log(gladiators[0].name + ' has won ' + '[ ' + gladiators[0].health + ']');
      console.log('------------------------------------------------------------------------------------------------');
      stopF();
    }
    }
   }
},20);
function stopF(){
  clearInterval(tm);
}

