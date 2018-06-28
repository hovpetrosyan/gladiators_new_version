//console.log(faker.name.findName())
const img_gl = ['https://www.graphicsfactory.com/clip-art/image_files/image/2/1440432-gladiator_cartoon.jpg','https://capetowncaricaturist.files.wordpress.com/2013/08/russell-crowe.jpg','https://thumbs.dreamstime.com/z/cartoon-gladiator-flexing-illustration-muscular-51211992.jpg','https://thumbs.dreamstime.com/b/cartoon-gladiator-18593886.jpg'];
class Cessar{
  kill(gladiator){
    gladiator.health = -1;
  }
  save(gladiator){
    gladiator.health = 50;
  }
}
class Gladiator{
  constructor(health,power,speed,name,img){
    this.health = health;
    this.power = power;
    this.speed = speed;
    this.name = name;
    this.initial_speed = speed;
    this.initial_health = health;
    this.ready_for_hit = true;
    this.img = img;
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
        gladiators[opp_nmb].health-=fake_this.power;gladiators[opp_nmb].health = (gladiators[opp_nmb].health).toFixed(3);/*console.log(gladiators);console.log(gladiators[opp_nmb].health);*/fake_this.ready_for_hit = true;
        console.log(' ['+fake_this.name+' x '+ fake_this.health +'] '+' hits '+' ['+gladiators[opp_nmb].name+' x '+ gladiators[opp_nmb].health+']'+'  with power ' + fake_this.power );
        let arena = document.getElementById('arena');

        let td1 = document.createElement('td');
        const imageNode = document.createElement('img');
        imageNode.src = fake_this.img;
        imageNode.setAttribute('height',50); 
        td1.appendChild(imageNode);
        let tr = document.createElement('tr');
        tr.appendChild(td1);

        let td3 = document.createElement('td');
        const nameNode = document.createTextNode(fake_this.name);
        td3.appendChild(nameNode);
        tr.appendChild(td3);
        arena.appendChild(tr);

        let td2 = document.createElement('td');
        const healthNode = document.createTextNode(fake_this.health);
        td2.appendChild(healthNode);
        tr.appendChild(td2);
        arena.appendChild(tr);

        let td4 = document.createElement('td');
        const imageNode1 = document.createElement('img');
        imageNode1.src = gladiators[opp_nmb].img;
        imageNode1.setAttribute('height',50); 
        td4.appendChild(imageNode1);
        
        tr.appendChild(td4);

        let td5 = document.createElement('td');
        const nameNode1 = document.createTextNode(gladiators[opp_nmb].name);
        td5.appendChild(nameNode1);
        tr.appendChild(td5);
        arena.appendChild(tr);

        let td6 = document.createElement('td');
        const healthNode1 = document.createTextNode(gladiators[opp_nmb].health);
        td6.appendChild(healthNode1);
        tr.appendChild(td6);
        arena.appendChild(tr);

        //console.log(fake_this.timer);
        },(Math.floor(5000/this.speed)));  
    }
  }
}
var gladiators = [];
var cessar = new Cessar();

for (i=0;i<3;i++){
  gladiators.push(new Gladiator((100-Math.floor(Math.random()*20)),(5-(Math.random()*3).toFixed(1)),(5-Math.floor(Math.random()*4)),faker.name.findName(),img_gl[i]));
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

