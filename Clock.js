var doc, I, ClockMaker; // for use on other loads
doc = document;
addEventListener('load', function(){
I = function(id){
  return doc.getElementById(id);
}
ClockMaker = function(output, offset, dst){
  this.clocks = [];
  var t = this;
  function out(a){
    var e = new Date(3600000*(-6)+Date.now()).toISOString()
    var l = e.replace(/[^0-9:\.]+/g, "");
    var today = new Date();
    var yr = l.substr(2,2);
    var dst_start = new Date("March 14, "+yr+" 02:00:00"); // 2nd Sunday in March can't occur after the 14th
    var dst_end = new Date("November 07, "+yr+" 02:00:00"); // 1st Sunday in November can't occur after the 7th
    var day = dst_start.getDay(); // day of week of 14th
    dst_start.setDate(14-day); // Calculate 2nd Sunday in March of this year
    day = dst_end.getDay(); // day of the week of 7th
    dst_end.setDate(7-day); // Calculate first Sunday in November of this year
    if (today >= dst_start && today < dst_end && a[2] === 1){ //does today fall inside of DST period?
      var k = 1; //if so then add 1 hour
    } else {
      var k = 0; //if not then do not add 1 hour
    }
    var o = a[1] || 0, dt = new Date(3600000*(o+k)+Date.now());
    var f = dt.toUTCString().replace(/[^0-9:\.]+/g, "");
    var r = f.substr(6, 8);
    var q = f.substr(4,4);
    a[0].innerHTML = r;
  }
  setInterval(function(){
    t.clocks.forEach(out);
  }, 10);
  this.clock = function(output, offset, dst){
    this.clocks.push([output, offset, dst]);
    return this;
  }
}
  var clocks = new ClockMaker;
  //clocks.clock(I("ElementId"), UTCOffset, observes DST(0 for no, 1 for yes));
  clocks.clock(I("Zulu"), 0, 0);
  clocks.clock(I("Houston"), -6, 1);
});
