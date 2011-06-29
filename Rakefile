require 'rubygems'
require 'ftools'
require 'rake/clean'
require 'rake/gempackagetask'

CLEAN.include('tmp', 'pkg')

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

task :chrome_package => [:clean, :package]

Rake::PackageTask.new("Hydration", "0.1") do |p|
  p.need_zip = true
  p.package_files.include("public/**/*")
  p.package_files.include("manifest.json")
end