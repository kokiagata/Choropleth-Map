let h = 700
let w = 1000
let padding = 50

let countyURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
let educationURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"

let svg = d3.select("body")
let countyData
let educationData

let setCanvas = ()=>{
  svg = svg.append("svg")
  .attr("height", h)
  .attr("width", w)
}



let setMaps = ()=>{
  svg.selectAll("path")
  .data(countyData)
  .enter()
  .append("path")
  .attr("d", d3.geoPath())
  .attr("class", "county")
  .attr("data-fips", (countyDataItem)=>{
      let id = countyDataItem["id"]
    let fips = educationData.find((item)=>{
     return item["fips"] === id
    })
    return fips["fips"]
    })
  .attr("data-education", (countyDataItem)=>{
      let id = countyDataItem["id"]
    let fips = educationData.find((item)=>{
     return item["fips"] === id
    })
    return fips["bachelorsOrHigher"]
    })
  .attr("fill", (countyDataItem)=>{
    let id = countyDataItem["id"]
    let fips = educationData.find((item)=>{
     return item["fips"] === id
    }
    )
    let percentage = fips["bachelorsOrHigher"]
   if(percentage < 5){
     return "#EAFAF1"
   }  else if(percentage >= 5 && percentage<15){
     return "#D5F5E3" 
   } else if(percentage >= 15 && percentage< 25){
     return "#ABEBC6"
   } else if (percentage >= 25 &&percentage < 35){
     return "#82E0AA"
   } else if (percentage >= 35 && percentage< 45){
     return "#58D68D"
   } else if (percentage >= 45 && percentage< 55){
     return "#28B463"
   } else if(percentage >= 55 && percentage< 65){
     return "#1D8348"
   } else {
     return "#0B5345"
   }
  })
  .on("mouseover", function(item, countyDataItem){
    
      d3.select(this).transition().duration(50).style("stroke", "orangered")
    
    div.transition().duration(50).style("opacity", .7)
    .style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY + 10) + "px")
    
    
    let id = countyDataItem["id"]
    let county = educationData.find(function(item){
     return item["fips"] === id
    })
    
    div.html(county["area_name"] + ", " + county["state"] + ": " + county["bachelorsOrHigher"] + "%")
    .attr("data-education", county["bachelorsOrHigher"])
    
      })
  .on("mouseout", function(educationData){
    d3.select(this).transition().duration(50).style("stroke", "none")
    
    div.transition().duration(50).style("opacity", 0)
  })
  
  let div = d3.select("body").append("div")
  .attr("id", "tooltip")
  .style("opacity", 0)
  
  
  let legend = svg.append("g")
  .attr("id", "legend")
  
  legend.append("rect")
  .attr("fill", "#EAFAF1")
  .attr("x", 600)
  .attr("y", 650)
  .attr("height", 10)
  .attr("width", 30)
  
  legend.append("rect")
  .attr("fill", "#D5F5E3")
  .attr("x", 630)
  .attr("y", 650)
  .attr("height", 10)
  .attr("width", 30)
  
  legend.append("rect")
  .attr("fill", "#ABEBC6")
  .attr("x", 660)
  .attr("y", 650)
  .attr("height", 10)
  .attr("width", 30)
  
  legend.append("rect")
  .attr("fill", "#82E0AA")
  .attr("x", 690)
  .attr("y", 650)
  .attr("height", 10)
  .attr("width", 30)
  
  legend.append("rect")
  .attr("fill", "#58D68D")
  .attr("x", 720)
  .attr("y", 650)
  .attr("height", 10)
  .attr("width", 30)
  
  legend.append("rect")
  .attr("fill", "#28B463")
  .attr("x", 750)
  .attr("y", 650)
  .attr("height", 10)
  .attr("width", 30)
  
  legend.append("rect")
  .attr("fill", "#1D8348")
  .attr("x", 780)
  .attr("y", 650)
  .attr("height", 10)
  .attr("width", 30)
  
  legend.append("rect")
  .attr("fill", "#0B5345")
  .attr("x", 810)
  .attr("y", 650)
  .attr("height", 10)
  .attr("width", 30)
  
  legend.append("text")
  .text(">5%")
  .attr("x", 605)
  .attr("y", 670)
  .attr("fill", "white")
  .style("font-size", 10)
  
  legend.append("text")
  .text("~15%")
  .attr("x", 635)
  .attr("y", 670)
  .attr("fill", "white")
  .style("font-size", 10)
  
  legend.append("text")
  .text("~25%")
  .attr("x", 665)
  .attr("y", 670)
  .attr("fill", "white")
  .style("font-size", 10)
  
  legend.append("text")
  .text("~35%")
  .attr("x", 695)
  .attr("y", 670)
  .attr("fill", "white")
  .style("font-size", 10)
  
  legend.append("text")
  .text("~45%")
  .attr("x", 725)
  .attr("y", 670)
  .attr("fill", "white")
  .style("font-size", 10)
  
  legend.append("text")
  .text("~55%")
  .attr("x", 755)
  .attr("y", 670)
  .attr("fill", "white")
  .style("font-size", 10)
  
  legend.append("text")
  .text("~65%")
  .attr("x", 785)
  .attr("y", 670)
  .attr("fill", "white")
  .style("font-size", 10)
  
  legend.append("text")
  .text(">65%")
  .attr("x", 815)
  .attr("y", 670)
  .attr("fill", "white")
  .style("font-size", 10)
  
  }



d3.json(countyURL).then(
(data, error)=>{
  if(error){
    console.log(error)
  } else {
    countyData = topojson.feature(data, data.objects.counties).features
    console.log(countyData)
    
    d3.json(educationURL).then(
    (data,error)=>{
      if(error){
        console.log(error)
      } else {
        educationData = data
        console.log(educationData)
        
        setCanvas()
        setMaps()
        generateTooltips()
        generateLegend()
      }
    })
  }
})
