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
  old_files = FileList["**/*"].exclude("tmp")
  puts old_files
end