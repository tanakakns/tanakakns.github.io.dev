tanakakns Github Pages Dev Project
====

Github Pagesを作ってみた。  
これは開発用プロジェクト。  
実際のGithub Pagesはdestのtanakakns.github.ioディレクトリ配下。  
チェックアプトして使用する場合、初回`npm install`をたたく。

## 初期構築メモ

### guleインストール
`npm install gulp -g`

### プロジェクトの作成
```sh
mkdir tanakakns.github.io  
cd tanakakns.github.io
```
### プロジェクト初期化
`npm init`

### プロジェクトにgulp導入
`npm install gulp --save-dev`  
gulpfile.jsを作成・編集  
```javascript
var gulp = require("gulp");
```

### プロジェクトにgulp-sass導入
`npm install gulp-sass --save-dev`  
※ gulp-sassはnode-sassを利用しているのでRubyのSassとは機能が若干異なる。Compassを使う場合はgulp-rubysassを使う。その場合は別途RubyとSassのインストールが必要。  
```sh
mkdir src  
midir src/scss  
touch src/scss/style.scss
```
src/scss/style.scssを編集  
```sass
h1 {  
  color: red;  
  &:hover {  
    color: blue;  
  }  
}
```  
gulpfile.jsを編集  
```javascript
var sass = require("gulp-sass");  
gulp.task("sass", function() {
    gulp.src("src/scss/**/*scss") // MiniMatchパターン
        .pipe(sass())
        .pipe(gulp.dest("./tanakakns.github.io/assets/css"));
});
```

#### MiniMatchパターン
* `“sass/style.scss”`
	* sass/style.scssだけヒット
* `“sass/*.scss”`
	* sassディレクトリ直下にあるscssがヒット
* `“sass/**/*.scss”`
	* sassディレクトリ以下にあるすべてのscssがヒット
* `[“sass/**/.scss”,"!sass/sample/**/*.scss]`
	* sass/sample以下にあるscssを除くsassディレクトリ以下のscssがヒット
  
gulpでsassを実行  
`gulp sass`

### ベンダプレフィックス自動付与
`npm install gulp-autoprefixer --save-dev`  
src/scss/style.scssを編集  
```sass
h1 {
    color: red;
    transition: 200ms ease-out transform;
    &:hover {
        color: blue;
        transform: translate(10px,0);
  }
}
```

gulpfile.jsを編集  
```javascript
var autoprefixer = require("gulp-autoprefixer");
gulp.task("sass", function() {
    gulp.src("src/scss/**/*scss")
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./tanakakns.github.io/assets/css"));
});
```

### プロジェクトにgulp-jade導入
`npm install gulp-jade --save-dev`

gulpfile.jsを編集  
```javascript
var jade = require("gulp-jade");
gulp.task("jade", function() {
    gulp.src("src/jade/**/*jade")
        .pipe(jade())
        .pipe(gulp.dest("./tanakakns.github.io/"));
});
```

### プロジェクトにgulp-typescript導入
`npm install gulp-typescript --save-dev`  

gulpfile.jsを編集  
```javascript
var typescript = require("gulp-typescript");
gulp.task("typescript", function() {
    gulp.src("src/typescript/**/*ts")
        .pipe(typescript())
        .pipe(gulp.dest("./tanakakns.github.io/assets/js"));
});
```

### compassインストール
Rubyをインストール。  
```sh
gem update --system
gem install compass
```

### プロジェクトにgulp-compass導入
`npm install gulp-compass --save-dev` 

gulpfile.jsを編集  
```javascript
var compass = require("gulp-compass");
gulp.task("sass", function() {
    gulp.src("./src/scss/**/*scss")
        .pipe(compass({
          config_file: './config.rb',
          css: 'tanakakns.github.io/assets/css',
          sass: 'src/scss'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest("./tanakakns.github.io/assets/css"));
});
```

config.rbを作成・編集  
```ruby
css_dir = "tanakakns.github.io/assets/css"
sass_dir = "src/scss"
images_dir = "src/img"
javascripts_dir = "tanakakns.github.io/assets/js"
relative_assets = true
cache = false
```
  
以下を実行  
`compass create ../tanakakns.github.io`  
  
以下標準出力  
```sh
  create src/scss/screen.scss
  create src/scss/print.scss
  create src/scss/ie.scss
  write assets/css/ie.css
  write assets/css/print.css
  write assets/css/screen.css
  *********************************************************************
  Congratulations! Your compass project has been created.
  You may now add and edit sass stylesheets in the src/scss subdirectory of your project.
  Sass files beginning with an underscore are called partials and won't be
  compiled to CSS, but they can be imported into other sass stylesheets.
  You can configure your project by editing the config.rb configuration file.
  You must compile your sass stylesheets into CSS when they change.
  This can be done in one of the following ways:
    1. To compile on demand:
       compass compile [path/to/project]
    2. To monitor your project for changes and automatically recompile:
       compass watch [path/to/project]
  More Resources:
    * Website: http://compass-style.org/
    * Sass: http://sass-lang.com
    * Community: http://groups.google.com/group/compass-users/
  To import your new stylesheets add the following lines of HTML (or equivalent) to your webpage:
  <head>
    <link href="/assets/css/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
    <link href="/assets/css/print.css" media="print" rel="stylesheet" type="text/css" />
    <!--[if IE]>
        <link href="/assets/css/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
    <![endif]-->
  </head>
```

### ビルドタスクの作成
gulpfile.jsの編集  
```javascript
gulp.task('build', ['sass', 'jade', 'typescript']);
```

### 簡易サーバで実行
`npm install gulp-webserver --save-dev`
```javascript
var webserver = require('gulp-webserver');
 
gulp.task('server', function() {
  gulp.src('./tanakakns.github.io')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});
```
  
### .gitignoreの設定
.gitignoreを作成・編集
```sh
node_modules/
!tanakakns.github.io/.git/**/*
tanakakns.github.io/
```
このignore設定をしているので、このプロジェクトは最初に`npm install`する必要あり。    

### delの追加
`npm install del --save-dev`  
```javascript
gulp.task('clean', function () {
  return del(
    'tanakakns.github.io/**/*',
    '!tanakakns.github.io/.git/**/*'
  );
});
```

### gulp-sitemapの追加
`npm install gulp-sitemap --save-dev`  
```javascript
var sitemap = require('gulp-sitemap');
 
gulp.task('sitemap', ['jade'], function () {
    gulp.src('tanakakns.github.io/**/*.html')
        .pipe(sitemap({
            siteUrl: 'https://tanakakns.github.io'
        }))
        .pipe(gulp.dest('./tanakakns.github.io'));
});```

### SyntaxHighlighterの追加
headにSyntaxHighlighterのJSとCSSをCDNから追加。  
下記を参照。  
http://www.oikawa-sekkei.com/web/design/js/  
http://alexgorbatchev.com/SyntaxHighlighter/  
https://cdnjs.com/libraries/SyntaxHighlighter  

### 参考：  
http://liginc.co.jp/web/tutorial/117900  
http://ichimaruni-design.com/2015/02/comapss-gulp/  

### マークダウン参考  
http://qiita.com/Qiita/items/c686397e4a0f4f11683d