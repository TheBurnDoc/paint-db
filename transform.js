// Split tags/colours into array
db.paints.find().forEach(el => {
    el.Tags = el.Tags.split(",").map(s => s.trim());
    el.Colours = el.Colours.split(",").map(s => s.trim());
    db.paints.save(el);
});