const models = require('../models')

const commentsData = [{
    name: 'Sun Ra', 
    comments: 'space is the place2'
},{
    name: 'Archandroid',
    comments: 'Electric Lady'
}]

const blackHoles = [{
    title: "blackhole1",
    nasa_id: "PIA22085",
    image_url: "https://images-assets.nasa.gov/image/PIA22085/PIA22085~thumb.jpg",
    description_508: "description",
}]


models.Comment.remove({}, function (err, res) {
    if (err) {
        console.log('Error removing comments: ', err);
        return;
    }
    console.log('Remove all Comments');

    models.Comment.create(commentsData, function (err, comments) {
        if (err) {
            console.log('Error creating Comments:', err);
            return;
        }

        console.log('Created ', comments.length, 'comments');

        models.Nasa.remove({}, function (err, res) {
            if (err) {
                console.log('Error removing comments: ', err);
                return;
            }

            console.log('comments', comments)

            models.Nasa.create(blackHoles, function (err, nasas) {
                if (err) {
                    console.log('Error creating Videos ', err);
                    return;
                }
                console.log('Created ', nasas.length, 'nasa things');
                nasas[0].comments.push(comments[0])
                nasas[0].save();
                return;
            })
        })
    })
})

