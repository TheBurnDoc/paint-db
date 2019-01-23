// Split tags/colours into array
db.paints.find().forEach(el => {
    el.tags = el.tags.split(",").map(s => s.trim());
    el.colours = el.colours.split(",").map(s => s.trim());
    db.paints.save(el);
});