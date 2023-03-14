from rest_framework import serializers
from authentication.models import CustomUser
from .models import *

class ArticleSerializer(serializers.ModelSerializer):
    fandoms = serializers.SlugRelatedField(many=True, queryset=Fandom.objects.all(), slug_field="name")
    cps = serializers.SlugRelatedField(many=True, queryset=CP.objects.all(), slug_field="name")
    characters = serializers.SlugRelatedField(many=True, queryset=Character.objects.all(), slug_field="name")
    grading = serializers.SlugRelatedField(queryset=Grading.objects.all(), slug_field="name")
    tags = serializers.SlugRelatedField(many=True, queryset=OtherTag.objects.all(), slug_field="name")
    class Meta:
        model = Article
        fields = '__all__'

    def create(self, validated_data):
        # pop columns to be created manually
        to_pop = ['fandoms', 'cps','characters','tags']
        for key in to_pop:
            validated_data.pop(key)

        # create article
        article = Article.objects.create(**validated_data)

        # tag info
        tags_to_add = [['fandoms', Fandom, article.fandoms],
                       ['cps', CP, article.cps],
                       ['characters', Character, article.characters],
                       ['tags', OtherTag,article.tags]]
        for tag in tags_to_add:
            tag_names = self.initial_data[tag[0]]
            for name in tag_names:
                ob, created = tag[1].objects.get_or_create(name=name)
                tag[2].add(ob)

        article.save()
        return article

    def update(self, instance, validated_data):
        print(validated_data)

        # change basic info
        instance.title = validated_data.get("title")
        instance.description = validated_data.get("description")
        instance.content = validated_data.get("content")
        instance.lastEditTime = validated_data.get("lastEditTime")

        # change grading
        grading, created = Grading.objects.get_or_create(name=validated_data.get("grading"))
        instance.grading = grading

        # change tags
        tags_to_add = [['fandoms', Fandom, instance.fandoms],
                       ['cps', CP, instance.cps],
                       ['characters', Character, instance.characters],
                       ['tags', OtherTag, instance.tags]]
        for tag in tags_to_add:
            tag_names = self.initial_data[tag[0]]
            for name in tag_names:
                ob, created = tag[1].objects.get_or_create(name=name)
                tag[2].add(ob)

        instance.save()
        return instance

class SearchResultSerializer(serializers.ModelSerializer):
    fandoms = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    cps = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    characters = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    grading = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )
    tags = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    class Meta:
        model = Article
        fields = ('id','title','description', 'word_count','createdTime','fandoms', 'cps', 'characters','grading','tags','creator')

