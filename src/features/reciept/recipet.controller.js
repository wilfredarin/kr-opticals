import pdfkit from "pdfkit";
import path from "path"
export const getAddReciept = (req,res)=>{
   
    res.render("reciept");
}

export const getAddReport = (req,res)=>{
    res.render("add-report")
}

export const addRecipt = (req,res)=>{
    const data = req.body;
    const name = data.name?data.name:"";
    const contact = data.contact?data.contact:"";
    const age = data.age?data.age:"";
    const date = data.date?data.data:"";
    const amountPaid = data.amountPaid?data.amountPaid:0;
    let products = []
    let price = []
    let totalAmount = 0;
    let balanceAmount = 0
    let cnt = 0
    for(let d in data){
        if(!["name","age","contact","amountPaid"].includes(d)){
            if(d.slice(0,8)=="productN"){
                products.push(data[d])
            }else{
                price.push(parseInt(data[d]));
                totalAmount+=parseInt(data[d]);
            }
        }
    }
    balanceAmount = totalAmount-amountPaid;




    

    const doc = new pdfkit();
    const fileName = `Bill_.pdf`;
    const filePath = `../downloads/${fileName}`;
    const fileFontSize = 10;
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);
    doc.fontSize(16).fillColor('red').font('Helvetica-Bold').
        text(`KONDAL REDDY`,
            {align:"center"}
        );
        doc.fontSize(16).fillColor('red').
        text(`EYE CARE & OPTICALS`,
            {align:"center"}
        );
        doc.fontSize(13).fillColor('black').font('Helvetica').
        text(`Opp: Old Municipality, Main Road, TOOPRAN, Dist. Medak`,
            {align:"center"}
        );
        doc.fontSize(13).fillColor('black').font('Helvetica-Bold').
        text(`Optometrisit: CH KONDAL REDDY`,
            {align:"center"}
        );
        doc.fontSize(13).fillColor('black').font('Helvetica').
        text(`Contact No.: 9441679040`,
            {align:"center"}
        );
        doc.fontSize(13).fillColor('black').font('Helvetica').
        text(`D. Opto (S.D.E.H), ICLEAP (L.V.P.E.H)`,
            {align:"center"}
        );
        doc.fontSize(13).fillColor('black').font('Helvetica').
        text(`(Regd. No. 969/Opthal/TSPMB)`,
            {align:"center"}
        );
        doc.fontSize(13).fillColor('black').font('Helvetica').
        text(`Refraction & Contact Lens Specialist`,
            {align:"center"}
        );
        doc.text(" ")
        doc.fontSize(14).fillColor('black').font('Helvetica-Bold').
        text(`COMPUTERISED EYE TESTING`,
            {align:"center"}
        );
        const leftMargin = 60; // Left margin for keys
        const rightMargin = 400; // Right margin for values (adjust for page size)
        doc.moveDown().font('Helvetica').fontSize(fileFontSize).text(`Name: ${name}`,leftMargin);
        
        doc.text(`Contact: ${contact}`,rightMargin);
        doc.text(`Date: ${date}`,leftMargin);
        doc.text(`Age: 20`,rightMargin);
        doc.text(" ")
        doc.text(" ")

        let currentHeight = doc.y;
       

        const lineHeight =  13*1.15; // 
        let lineNum = 1;
        console.log(price.length,price)
        for(let i =0;i<price.length;i++){
           if(i==0){
            doc.font('Helvetica-Bold').fontSize(fileFontSize+1).text("Product",leftMargin,currentHeight+lineNum*lineHeight)
            doc.font('Helvetica-Bold').fontSize(fileFontSize+1).text("Rate",rightMargin,currentHeight+lineNum*lineHeight)
            lineNum+=2
           }
            doc.font('Helvetica').fontSize(fileFontSize).text(products[i],leftMargin+5,currentHeight+lineNum*lineHeight)
            doc.font('Helvetica').fontSize(fileFontSize).text(price[i],rightMargin,currentHeight+lineNum*lineHeight)
            lineNum+=1
        }
        
        
        lineNum+=1
        doc.font('Helvetica-Bold').text(`Total Amount`,leftMargin,currentHeight+lineHeight*lineNum);
        doc.text(`${totalAmount}`,rightMargin,currentHeight+lineHeight*lineNum);
        lineNum+=1
        doc.text(`Amount Paid`,leftMargin,currentHeight+lineHeight*lineNum);
        doc.text(`${amountPaid}`,rightMargin,currentHeight+lineHeight*lineNum);
        lineNum+=1
        doc.text(`Balance`,leftMargin,currentHeight+lineHeight*lineNum);
        doc.text(`${balanceAmount}`,rightMargin,currentHeight+lineHeight*lineNum);
        
    
    doc.end();
    doc.on('finish',function(){
        res.download(filePath, fileName, function(err) {
            if (err) {
            console.log(err);
            } else {
            fs.unlinkSync(filePath);
            }
        });
    });
}






