require 'rubygems'
require 'ftools'
require 'rake/clean'

CLEAN.include('tmp')

task :default => :test

task :test do |t|
  test_files = FileList['test/*test*.html']
  test_files.each{|file| `open #{file}`}
end

task :deploy do |t|
  `git checkout master`
  `git pull origin master`
  `mkdir tmp`
  `cp -r public/ tmp`
  `git checkout gh-pages`
  `git pull origin gh-pages`
  FileList["**/*"].exclude("tmp").each {|file| `rm -rf #{file}`}
  `cp -r tmp/* .`
  `rm -rf tmp`
  `git add .`
  `git ci -m "deploy latest changes"`
  `git push origin gh-pages`
  `git checkout master`
end