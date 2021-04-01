const { Client, MessageEmbed } = require('discord.js');
const client = new Client();

sum = (numbers) => {
  // Sums a list.
  var sum = 0;
  for (let i = 0; i <= numbers.length - 1; i++) {
    sum += numbers[i]
  }
  return sum
}

reverse_objects = (obj, value) => {
  // Gets the key of an object, given its respective value.
  const keys = Object.keys(obj);
  // Fetches the key of an object given a value.
  for (let i = 0; i <= keys.length - 1; i++) {
    let key = keys[i];
    if(obj[key] === value) {
      return key
    }
  }
}

mean_gpa = (grades) => {
  // Calculates weighted mean of the user's GPA.

  const letters = ['a', 'b', 'c', 'd', 'e', 'f'];

  // YorkU GPA Scale
  var scale = {
    aplus: 9,
    a: 8,
    bplus: 7,
    b: 6,
    cplus: 5,
    c: 4,
    dplus: 3,
    d: 2,
    e: 1,
    f: 0,
  };

  var points = [];
  var weights = [];

  for (let i = 0; i <= grades.length - 1; i++) {
    // Removing '+' from grade, replacing with 'plus' so we can use the scale object.
    var grade = grades[i];
    var weight = 3;
    if(grade.includes('+')) {
      grade = grade[0] + 'plus'
    }

    // Converting number grade to leter grade.
    if(!(letters.includes(grade[0]))) {
      var grade = reverse_objects(scale, parseInt(grade));
    }

    // Fetching weight from grade.
    else if(grade.includes('(')) {
      opening_bracket = grade.indexOf('(');
      var weight = parseInt(grade.slice(opening_bracket+1, opening_bracket+2));

      var grade = grade.slice(0, opening_bracket-1)
    }
    weights.push(weight);

    // Converting string to number grade.
    var point = scale[grade]*weight;
    points.push(point)
  }

  const mean_grade = sum(points)/sum(weights)
  return mean_grade


}

client.on('message', msg => {
  if (msg.content.startsWith('+gpa') && !(msg.content == '+gpahelp') && !(msg.content == '+gpastatus')) {
    grades_isolated = msg.content.slice(5, msg.content.length).toLowerCase();
    grades = grades_isolated.split(', ');
    const embed = new MessageEmbed()
      .setTitle("GPA Calculator")
      .setColor(0x0060aa)
      .setDescription("Your GPA is: " + mean_gpa(grades))
      .setFooter("Need help with using the bot? Try +gpahelp, or tag @Nitr0us");
    msg.author.send(embed)
  }

  if(msg.content.startsWith('+gpahelp')) {
    const embed = new MessageEmbed()
      .setTitle("GPA Calculator (Help)")
      .setColor(0x0060aa)
      .setDescription("__**Instructions**__\n Calculate your GPA, using the `+gpa` command, followed by your grades (you can use letters, numbers, or both). \n\n By default, the credit weighting is 3.0, to increase it include the weight in brackets after the grade. \n\n Example: ``+gpa 9, 8, 6, A, 7 (6)``")
      .setFooter("Need help with using the bot? Try +gpahelp, or tag @Nitr0us");
    msg.channel.send(embed)

  }

  if (msg.content === '+gpastatus') {
    const embed = new MessageEmbed()
      .setTitle("GPA Calculator (Status)")
      .setColor(0x0060aa)
      .setDescription("We're online!")
      .setFooter("Need help with using the bot? Try +gpahelp, or tag @Nitr0us");
    msg.channel.send(embed)
  }

});

client.login('')
