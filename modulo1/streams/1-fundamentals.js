// process.stdin
//     .pipe(process.stdout)
import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1 
    _read() {
        const i = this.index++
        setTimeout(()=>{
            if (i>100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        },1000)
        // sem stream:
        // if(i>100) {
        //     this.push(null) //push metodo de readable stream fornecer informaçoes
        // } else {
        //     const buf = Buffer.from(String(i))
        //     this.push(buf)
        // }
    }
}

new OneToHundredStream()
    .pipe(process.stdout)