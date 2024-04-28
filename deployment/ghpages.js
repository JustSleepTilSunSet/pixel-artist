const options = {
    branch: 'gh-pages',
    repo: require(`${__dirname}/ghpage_config.json`).REPO // Here is your repo.
};

const callback = err => {
    if (err) console.error(err);
    else console.log('publish success');
};

ghpages.publish(path.resolve(__dirname, '../dist'), options, callback);