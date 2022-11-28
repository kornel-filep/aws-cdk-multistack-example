yum install -y amazon-linux-extras

amazon-linux-extras install java-openjdk11

java -version

wget -O app.jar https://modszertanokbackend.s3.eu-central-1.amazonaws.com/modszertanok.backend-0.0.1-SNAPSHOT.jar

chown ec2-user app.jar

java -jar app.jar