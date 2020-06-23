<template>
  <div id="app">
    
    <p>{{date}}</p>

    <date-picker 
      custom-class="center"
      ref="date"
      v-model="date"
      type="date"
      separator="-"
      @getValue="getTime"
    />
    <img ref="img" src="./assets/star.png" alt="">
    <canvas ref="canvas"></canvas>

  </div>
</template>

<script>
import datePicker from '@/components/datePicker'
import { Encoder, QRByte, QRKanji, ErrorCorrectionLevel } from '@nuintun/qrcode';
 

export default {
  data(){
    return {
      date: '2020-01-08',
      url: './assets/star.png'
    }
  },
  components: {
    datePicker
  },
  mounted(){
    const qrcode = new Encoder();
 
    qrcode.setEncodingHint(true);
    qrcode.setErrorCorrectionLevel(ErrorCorrectionLevel.H);

    
    // qrcode.write('https://www.iconfont.cn/search/index?searchType=icon&q=star');
    qrcode.write('色棍 你妹啊 回家吃饭啊!!');
    // qrcode.write(new QRByte('hello world\n'));
    // qrcode.write(new QRKanji('こんにちは世界'));

    qrcode.make();
    //this.url = qrcode.toDataURL()
    let arr = qrcode.getMatrix()
    console.log(arr)
    let length = arr.length
    let border = 10
    let w = 10
    let r = w/2
    let canvas = this.$refs.canvas
    canvas.width = w * length + border*2
    canvas.height = w * length + border*2
    let ctx = canvas.getContext('2d')
    let L = 7
    
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,canvas.width, canvas.height)
    ctx.stroke();

   

    arr.map((line,y) => {
      line.map((flag,x) => {

        if(y < L && x < L){ // 去除定位点
          flag = 0
        }
        if(y < L && x > length - L -1){
          flag = 0
        }
        if(y > length - L -1 && x < L){
          flag = 0
        }

        if(flag){ 
          let i = Math.random()
          let ra = 2
          if(i < 0.1){
            ra = 1
          }
          if(i > 0.7){
            ra = 3
          }
          if(i > 0.8){
            ra = 4
          }
          ctx.beginPath();  // 圆点
          ctx.fillStyle= '#000';
          ctx.arc(x*w+r + border, y*w+r + border, ra, 0, 2*Math.PI);
          ctx.fill();
          ctx.stroke();
          // ctx.drawImage(this.$refs.img,x*w,y*w,w,w)
        }
        if(flag === false){
          let i = Math.random()
          let color = '#000'
          if(i > 0.8){
            ctx.beginPath();  // 圆点
            ctx.fillStyle= color;
            ctx.strokeStyle = color
            ctx.arc(x*w+r + border, y*w+r+ border, 3, 0, 2*Math.PI);
            // ctx.fill();
            ctx.stroke();
          }
          
        }
      })
    })

    // this.drawRectSite(ctx, length)
    this.drawArcSite(ctx, length, border)
    
  },
  methods:{
    drawArcSite(ctx, length, b){
      let L = 6
      let w = 10
      let r = w/2
      let width = 3*w
      let sitePos1 = (w*L/2) + r + b
      let sitePos2 = (length-L)*w + width/2 + w + b
      let color = "#000"
      let R = w
      ctx.lineWidth = w
      ctx.fillStyle= color;
      ctx.strokeStyle = color;

      ctx.beginPath();
      ctx.arc(sitePos1, sitePos1, L*w/2, 0, Math.PI*2)
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(sitePos1, sitePos1, R, 0, Math.PI*2)
      ctx.fill()
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(sitePos2, sitePos1, L*w/2, 0, Math.PI*2)
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(sitePos2, sitePos1, R, 0, Math.PI*2)
      ctx.fill()
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(sitePos1, sitePos2, L*w/2, 0, Math.PI*2)
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(sitePos1, sitePos2, R, 0, Math.PI*2)
      ctx.fill()
      ctx.stroke();

      
    },
    drawRectSite(ctx, length, b){
      let L = 7
      let w = 10
      let r = w/2
      let width = 3*w
      let sitePos1 = (w*L/2) - width/2 + b
      let sitePos2 = (length-L)*w + width/2 + r + b
      L = L - 1
      let color = '#ccc'
      ctx.fillStyle= color;
      ctx.beginPath();
      ctx.lineWidth = w
      ctx.strokeStyle = color;
      ctx.rect(r, r, w*L, w*L);
      ctx.fillRect(sitePos1,  sitePos1, width, width)
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = w
      ctx.strokeStyle = color;
      ctx.rect((length-L)*w - r, r, w*L, w*L);
      ctx.fillRect(sitePos2, sitePos1, width, width)
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = w
      ctx.strokeStyle = color;
      ctx.rect(r, (length-L)*w - r, w*L, w*L);
      ctx.fillRect(sitePos1, sitePos2, width, width)
      ctx.stroke();
    },
    getTime(time){
      console.log(time)
      console.log(time.date)
      
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.center{
  width: 320px;
  margin: 0 auto auto auto;
}
canvas{
  margin-top: 20px;
  border: 1px solid #f5f5f5;
}
</style>

